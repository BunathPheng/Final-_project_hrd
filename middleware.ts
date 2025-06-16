// middleware.ts - Fixed guest access control
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { getSession } from "./utils/session"

// Define user roles - visitor and guest are treated the same
type UserRole = "ROLE_VISITOR" | "ROLE_MUSEUM_OWNER" | "ROLE_ADMIN" 

export default async function middleware(req: NextRequest) {
  const session = await getSession();
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!session;
  const userRole = session?.payload?.user?.appUserRegister?.role as UserRole;
  
  // Routes configuration by role
  const routes = {
    // Public routes (accessible by everyone, including anonymous users)
    public: [
      "/",
      "/about-us",
      "/contact",
      "/faq"
    ],
    
    // Authentication routes (login, register, etc.)
    auth: [
      "/login",
      "/register", 
      "/forgot-password",
      "/reset-password"
    ],
    
    // Guest/Visitor routes (accessible by unauthenticated users AND ROLE_VISITOR)
    // These are the routes that both guests and visitors can access
    guestVisitor: [
      "/events",
      "/museum"
    ],
    
    // Museum-owner routes (only accessible when logged in as ROLE_MUSEUM_OWNER)
    museumOwner: [
      "/museum-owner/overview",
      "/museum-owner/museum",
      "/museum-owner/zone", 
      "/museum-owner/events",
      "/museum-owner/visitor",
      "/museum-owner/ticket",
      "/museum-owner/guides"
    ],
    
    // Admin-only routes (only accessible when logged in as ROLE_ADMIN)
    admin: [
      "/admin/overview",
      "/admin/visitor",
      "/admin/museums"
    ],
  }

  // Route checking functions
  const isAuthRoute = routes.auth.includes(pathname)
  const isPublicRoute = routes.public.some(route => pathname === route || pathname.startsWith(route))
  const isGuestVisitorRoute = routes.guestVisitor.some(route => pathname.startsWith(route))
  const isAdminRoute = routes.admin.some(route => pathname.startsWith(route))
  const isMuseumOwnerRoute = routes.museumOwner.some(route => pathname.startsWith(route))

  // Handle public routes first - always allow access
  if (isPublicRoute) {
    console.log(`🌐 Public route access: ${pathname}`)
    return NextResponse.next()
  }

  // Handle authentication routes
  if (isAuthRoute) {
    // If user is already logged in, redirect to their appropriate landing page
    if (isLoggedIn && userRole) {
      const landingUrl = getRoleLandingPage(userRole)
      console.log(`✅ Redirecting authenticated ${userRole} from ${pathname} to ${landingUrl}`)
      return NextResponse.redirect(new URL(landingUrl, req.nextUrl))
    }
    
    // Allow access to auth routes for unauthenticated users
    console.log(`🔓 Allowing access to auth route: ${pathname}`)
    return NextResponse.next()
  }

  // Handle guest/visitor routes - accessible by guests AND visitors
  if (isGuestVisitorRoute) {
    if (!isLoggedIn) {
      // Allow guest (unauthenticated) access
      console.log(`👤 Guest access to: ${pathname}`)
      return NextResponse.next()
    } else if (userRole === 'ROLE_VISITOR') {
      // Allow visitor (authenticated) access
      console.log(`✅ Visitor access to: ${pathname}`)
      return NextResponse.next()
    } else {
      // Logged in but not as visitor - redirect to their appropriate dashboard
      console.log(`🔄 Redirecting ${userRole} from guest/visitor route ${pathname} to their dashboard`)
      const dashboardUrl = getRoleDashboard(userRole)
      return NextResponse.redirect(new URL(dashboardUrl, req.nextUrl))
    }
  }

  // Handle admin routes - STRICTLY only for ROLE_ADMIN
  if (isAdminRoute) {
    return handleStrictAdminAccess(req, userRole, isLoggedIn)
  }

  // Handle museum owner routes - STRICTLY only for ROLE_MUSEUM_OWNER
  if (isMuseumOwnerRoute) {
    return handleStrictMuseumOwnerAccess(req, userRole, isLoggedIn)
  }

  // For any other routes, redirect based on authentication status
  if (!isLoggedIn) {
    console.log(`❌ Unauthenticated access to protected route: ${pathname}`)
    return redirectToLogin(req.nextUrl)
  }

  // If logged in but route not found, redirect to appropriate dashboard
  console.log(`🔄 Redirecting logged-in ${userRole} from unmatched route ${pathname} to dashboard`)
  const dashboardUrl = getRoleDashboard(userRole)
  return NextResponse.redirect(new URL(dashboardUrl, req.nextUrl))
}

// Helper function for STRICT admin access (only ROLE_ADMIN allowed)
function handleStrictAdminAccess(
  req: NextRequest,
  userRole: UserRole,
  isLoggedIn: boolean
): NextResponse {
  const { pathname } = req.nextUrl;

  if (!isLoggedIn) {
    console.log(`❌ Unauthenticated attempt to access admin route: ${pathname}`)
    return redirectToLogin(req.nextUrl)
  }

  // ONLY ROLE_ADMIN can access admin routes
  if (userRole !== 'ROLE_ADMIN') {
    console.log(`🚫 BLOCKED: ${userRole} attempted to access admin route: ${pathname}`)
    const dashboardUrl = getRoleDashboard(userRole)
    return NextResponse.redirect(new URL(dashboardUrl, req.nextUrl))
  }

  console.log(`✅ Admin access granted: ${userRole} accessing ${pathname}`)
  return NextResponse.next()
}

// Helper function for STRICT museum owner access (only ROLE_MUSEUM_OWNER allowed)
function handleStrictMuseumOwnerAccess(
  req: NextRequest,
  userRole: UserRole,
  isLoggedIn: boolean
): NextResponse {
  const { pathname } = req.nextUrl;

  if (!isLoggedIn) {
    console.log(`❌ Unauthenticated attempt to access museum owner route: ${pathname}`)
    return redirectToLogin(req.nextUrl)
  }

  // ONLY ROLE_MUSEUM_OWNER can access museum owner routes
  if (userRole !== 'ROLE_MUSEUM_OWNER') {
    console.log(`🚫 BLOCKED: ${userRole} attempted to access museum owner route: ${pathname}`)
    const dashboardUrl = getRoleDashboard(userRole)
    return NextResponse.redirect(new URL(dashboardUrl, req.nextUrl))
  }

  console.log(`✅ Museum Owner access granted: ${userRole} accessing ${pathname}`)
  return NextResponse.next()
}

// Helper function to get role-specific dashboard (where users go when blocked from other areas)
function getRoleDashboard(role: UserRole): string {
  switch (role) {
    case "ROLE_VISITOR":
      return '/events' // Visitors go to events page
    case 'ROLE_MUSEUM_OWNER':
      return "/museum-owner/overview"
    case 'ROLE_ADMIN':
      return "/admin/overview"
    default:
      return '/login'
  }
}

// Helper function to get role-specific landing page (where users go after login)
function getRoleLandingPage(role: UserRole): string {
  switch (role) {
    case "ROLE_VISITOR":
      return '/events' // After login, visitors go to events
    case 'ROLE_MUSEUM_OWNER':
      return "/museum-owner/overview"
    case 'ROLE_ADMIN':
      return "/admin/overview"
    default:
      return '/events' // Default to guest area
  }
}

// Helper function to redirect to login with callback
function redirectToLogin(nextUrl: URL): NextResponse {
  let callbackUrl = nextUrl.pathname
  if (nextUrl.search) {
    callbackUrl += nextUrl.search
  }
  
  const encodedCallbackUrl = encodeURIComponent(callbackUrl)
  return NextResponse.redirect(
    new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
  )
}

export const config = {
  matcher: [
    '/(.*)', // Matches everything
  ],
}