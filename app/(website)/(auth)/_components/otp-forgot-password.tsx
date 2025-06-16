"use client"

import { useEffect, useState } from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
// Add your resend action import here
// import { resendOtpAction } from "@/action/auth/resend-otp-action"
import { toast } from "sonner"
import Image from "next/image"
import loadingImage from "../../../../public/loading/loading.svg"
import { forgotPasswordAction } from "@/action/auth/forgot-password-action"
import { verifyForgotPasswordAction } from "@/action/auth/verify-forgot-password-action"
import { verifyExpirationAction } from "@/action/auth/verify-expiration-action"

interface OtpFormData {
  otp: string;
}

export const OtpForgotPasswordForm: React.FC<{ email: string, expiration: string }> = ({ email, expiration }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const router = useRouter();

  // Helper function to calculate remaining time from expiration
  const calculateRemainingTime = (exp: string | number): number => {
    let initialTime: number;

    if (typeof exp === 'string') {
      // Try to parse as number first
      initialTime = parseInt(exp, 10);

      // If it's still NaN, it might be a date string
      if (isNaN(initialTime)) {
        const expirationDate = new Date(exp);
        const now = new Date();
        initialTime = Math.floor((expirationDate.getTime() - now.getTime()) / 1000);
      }
    } else if (typeof exp === 'number') {
      initialTime = exp;
    } else {
      initialTime = 0;
    }

    // Ensure we have a valid positive number
    if (isNaN(initialTime) || initialTime < 0) {
      initialTime = 0;
    }

    return initialTime;
  };

  // Function to start countdown timer
  const startCountdown = (timeInSeconds: number) => {
    setRemainingTime(timeInSeconds);

    if (timeInSeconds <= 0) return; // no need to start timer if already expired

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return interval;
  };

  useEffect(() => {
    const initialTime = calculateRemainingTime(expiration);
    startCountdown(initialTime);
  }, [expiration]);

  const formatTime = (seconds: number): string => {
    // Handle invalid numbers
    if (isNaN(seconds) || seconds < 0) {
      return "0:00";
    }

    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<OtpFormData>({
    defaultValues: {
      otp: "",
    },
  });

  // Handle OTP verification
  const handleOtp = async (data: OtpFormData) => {
    if (!email) {
      toast.error("Email not found. Please try again.");
      return;
    }
    setIsLoading(true);
    try {
      const otpData = { email: email, otp: data.otp };
      const result = await verifyForgotPasswordAction(otpData);
      if (result?.data?.status === "OK") {
        const queryParams = new URLSearchParams({
          token: result?.data?.payload?.token,
          ...(result?.data?.userId && { userId: result.data.userId.toString() }),
          ...(result?.data?.token && { token: result.data.token })
        });
        toast.success(result?.data?.message);
        router.push(`/forgot-password/otp-forgot-password/new-password?${queryParams.toString()}`);
      } else {
        toast.error(
          result?.data?.errors?.message ||
          result?.data?.errors?.detail
        );
        // Reset the form on error
        reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP resend
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found. Please try again.");
      return;
    }
    setIsResending(true);
    try {
      const result = await forgotPasswordAction({ email });
      if (result?.data?.status === "OK") {
        // Get the new expiration time
        const otpExpiration = await verifyExpirationAction({email});
        const newExpiration = otpExpiration?.data?.payload?.expiration;

        // Calculate and start new countdown with the fresh expiration
        if (newExpiration) {
          const newRemainingTime = calculateRemainingTime(newExpiration);
          startCountdown(newRemainingTime);
        }
        toast.success(result?.data?.message);
        reset(); // Reset the OTP input field
      } else {
        toast.error(
          result?.data?.errors?.message ||
          result?.data?.errors?.detail
        );
        reset();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Resend OTP error");
    } finally {
      setIsResending(false);
    }
  };

  // Check if OTP has expired
  const isExpired = remainingTime <= 0;

  return (
    <form
      onSubmit={handleSubmit(handleOtp)}
      className="mx-auto max-w-[25rem] h-screen flex flex-col justify-center"
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-h4 text-center text-primary-700">
          Enter verification code
        </h1>
        <p className="text-p1 text-grey-900 text-center">
          We have sent you an email. Please check your inbox and complete the OTP verification.
        </p>

        <div className="justify-center flex">
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "OTP is required",
              minLength: {
                value: 6,
                message: "Please enter a complete 6-digit OTP"
              },
              pattern: {
                value: /^\d{6}$/,
                message: "OTP must be exactly 6 digits"
              }
            }}
            render={({ field }) => (
              <InputOTP
                value={field.value}
                onChange={field.onChange}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                autoComplete="one-time-code"
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>

        {/* Display form validation errors */}
        {errors.otp && (
          <p className="text-sm text-red-500">{errors?.otp?.message}</p>
        )}

        {/* Show different messages based on expiration status */}
        {isExpired ? (
          <p className="text-p1 text-red-500 text-center font-medium">
            The OTP has expired. Please request a new one.
          </p>
        ) : (
          <p className="text-p1 text-grey-500 text-center">
            The OTP will expire in <span className="text-primary-700">
              {formatTime(remainingTime)}
            </span> {remainingTime > 60 ? "minutes" : "seconds"}
          </p>
        )}

        <Button
          className="w-36"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Image src={loadingImage} className="w-7 h-7 object-cover" alt="loading" /> : "Verify"}
        </Button>

        {/* Resend button - enabled only when expired and not currently resending */}
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={!isExpired || isResending}
          className={`text-p1 font-normal underline underline-offset-3 transition-colors duration-200 ${!isExpired || isResending
            ? 'text-grey-400 cursor-not-allowed'
            : 'text-grey-600 hover:text-grey-700 cursor-pointer'
            }`}
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </form>
  )
}