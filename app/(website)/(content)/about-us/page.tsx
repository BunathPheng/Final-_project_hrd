import HeadingTitle from "@/components/feature/label/heading-title";
import { JSX } from "react";
import MentorCard from "./_components/mentor-card";
import { MENTORS } from "@/constants/mentors-data";
import MemberCard from "./_components/member-card";
import { MEMBERS } from "@/constants/members-data";
import Image from "next/image";
export default function AboutUsPage(): JSX.Element {
    return (
        <>
            {/* Banner Section */}
            <section className="w-full relative">
                <Image src={"/images/us.jpg"} className="w-full h-[33rem] object-cover" width={1440} height={534} alt="BTB Member" />
                <div className="absolute top-0 left-0 bg-black/40 w-full h-full flex justify-center items-center">
                    <div className="grid gap-5 text-center">
                        <h1 className="text-white text-h2 drop-shadow-600">BTB CLASS MEMBER</h1>
                        <div className="w-28 h-1 bg-yellow-600 rounded-full mx-auto"></div>
                        <p className="text-white text-2xl italic text-h4 !font-normal drop-shadow-600">
                            <q>Coming Together is a beginning. Keeping together is <br></br>progress. Working together is success</q>
                        </p>
                        <div className="bg-white/30 border-2 w-fit px-5 py-2 drop-shadow-600 mx-auto rounded-full text-s2 border-white text-white">
                            Class of 2025
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="pd-screen container mt-20 gap-8 grid grid-cols-12 ">
                <div className="col-span-4 rounded-md bg-grey-100">
                    <Image src={"/images/korean_team.jpg"} className="object-cover h-96 w-full rounded-md" width={459} height={459} alt="BTB Team" />
                </div>
                <div className="col-span-8">
                    <div className="text-justify">
                        <h1 className="font-bold text-h2 text-grey-900">
                            A Few Words About Us
                        </h1>
                        <div className="w-47.5 h-1 bg-red-700 rounded-full mb-5"></div>
                        <p className="text-p1 text-justify">
                            Selamonty is an innovative digital platform created
                            to bring together museums and cultural experiences
                            from around the  world in one accessible
                            space. Our mission is to help people explore and
                            appreciate the richness of global history, art,
                            and heritage, no matter where they are.
                            <br></br>
                            The project is developed by a dedicated team of
                            seven,passionate members, supported and mentored by
                            three experienced instructors from the
                            Korea Software HRD Center (KSHRD). Together, we aim
                            to bridge the gap between cultural
                            institutions and curious minds by providing a
                            centralized hub where users can discover treasures,
                            learn about different cultures, and deepen
                            their understanding of the world&apos;s diverse
                            civilizations.{" "}
                        </p>
                        <p className="text-p1 text-justify">
                            At Selamonty, we believe that museums are more than
                            just buildings; they are windows into the past,
                            present, and future of humanity. Through
                            our platform, visitors can explore museum profiles,
                            view cultural highlights, and gain insights into{" "}
                            traditions and innovations across
                            continents.
                        </p>
                        <p className="text-p1 text-justify">
                            Whether you&apos;re planning a visit, conducting
                            research, or simply exploring out of curiosity,
                            Selamonty is your gateway to the world&apos;s
                            culture.
                        </p>
                    </div>
                </div>
            </section>
            <div className="pd-screen mt-20 text-center">
                <HeadingTitle title="OUR" highlight="MISSION" />
            </div>
            <section className="pd-screen container mt-20 grid grid-cols-5 gap-5  ">
                <div className=" border-l-10 border-red-700 px-15 py-20 col-span-3">
                    <div className="flex gap-x-5 items-center">
                        <div
                            className="bg-black h-[55px]  w-[56px]"
                            style={{
                                backgroundImage:
                                    "url('./images/mission-small.jpg')",
                            }}
                        ></div>
                        <h1>
                            <span className="text-red-700 text-h4">
                                Global Reach{" "}
                            </span>
                            <span className="text-h6 text-grey-900">
                                : Showcasing museums from every corner of the
                                world{" "}
                            </span>
                        </h1>
                    </div>
                    <div className="flex gap-x-5 mt-10 items-center">
                        <div
                            className="bg-black h-[55px]  w-[56px]"
                            style={{
                                backgroundImage:
                                    "url('./images/mission-small.jpg')",
                            }}
                        ></div>
                        <h1>
                            <span className="text-red-700 text-h4">
                                Knowledge{" "}
                            </span>
                            <span className="text-h6 text-grey-900">
                                : Verified information you can trust
                            </span>
                        </h1>
                    </div>
                    <div className="flex gap-x-5 mt-10 items-center">
                        <div
                            className="bg-black h-[55px]  w-[56px]"
                            style={{
                                backgroundImage:
                                    "url('./images/mission-small.jpg')",
                            }}
                        ></div>
                        <h1>
                            <span className="text-red-700 text-h4">
                                Stewardship
                            </span>
                            <span className="text-h6 text-grey-900">
                                : Supporting museums through visibility
                            </span>
                        </h1>
                    </div>
                </div>

                <div
                    className="col-span-2   bg-no-repeat bg-right "
                    style={{
                        backgroundImage: "url('./images/mission.jpg')",
                        backgroundSize: "contain",
                    }}
                ></div>
            </section>
            <div className="pd-screen container mt-20 text-center">
                <HeadingTitle title="OUR" highlight="VISION" />
            </div>
            <section className="pd-screen container mt-20 grid grid-cols-5   ">
                <div
                    className="col-span-2   bg-no-repeat  "
                    style={{
                        backgroundImage: "url('./images/vision2.jpg')",
                        backgroundSize: "contain",
                    }}
                ></div>
                <div className=" border-r-10 border-red-700 px-15 py-20 col-span-3">
                    <div className="flex gap-x-5 items-center">
                        <div
                            className="bg-black h-[55px]  w-[56px]"
                            style={{
                                backgroundImage: "url('./images/vision1.jpg')",
                            }}
                        ></div>
                        <h1>
                            <span className="text-red-700 text-h4">
                                Seamless Tech
                            </span>
                            <span className="text-h6 text-grey-900">
                                : Showcasing museums from every corner of the
                                world
                            </span>
                        </h1>
                    </div>
                    <div className="flex gap-x-5 mt-10 items-center">
                        <div
                            className="bg-black h-[55px]  w-[56px]"
                            style={{
                                backgroundImage: "url('./images/vision1.jpg')",
                            }}
                        ></div>
                        <h1>
                            <span className="text-red-700 text-h4">
                                Knowledge
                            </span>
                            <span className="text-h6 text-grey-900">
                                : Innovate for universal accessibility
                            </span>
                        </h1>
                    </div>
                    <div className="flex gap-x-5 mt-10 items-center">
                        <div
                            className="bg-black h-[55px]  w-[56px]"
                            style={{
                                backgroundImage: "url('./images/vision1.jpg')",
                            }}
                        ></div>
                        <h1>
                            <span className="text-red-700 text-h4">
                                Stewardship
                            </span>
                            <span className="text-h6 text-grey-900">
                                : Technology that uplifts, not overwhelms
                            </span>
                        </h1>
                    </div>
                </div>
            </section>
            <div className="pd-screen container mt-20 flex gap-5 ">
                <div className=" border-l-10 border-red-700  py-12" />
                <div className="flex flex-col justify-center items-center gap-y-8">
                    <h1 className="font-bold text-h4">
                        KSHRD <br />
                        <br />
                        ACTIVITY
                    </h1>
                </div>
            </div>

            {/* KSHRD Activity */}
            <section className="pd-screen container mt-10 grid grid-cols-12 grid-rows-8 gap-8">
                <Image src={"/images/korea.jpg"} className="col-span-5 row-span-8 object-cover rounded-md w-full h-[24rem]" width={533} height={500} alt="Korea" />
                <Image src={"/images/sem.jpg"} className="col-span-4 row-span-8 object-cover rounded-md w-full h-[24rem]" width={533} height={500} alt="Korea" />
                <Image src={"/images/football.jpg"} className="col-span-3 row-span-8 object-cover rounded-md w-full h-[24rem]" width={312} height={412} alt="Korea" />
                <Image src={"/images/cher.jpg"} className="col-span-5 row-span-4 object-cover rounded-md w-full h-[24rem]" width={533} height={355} alt="Korea" />
                <Image src={"/images/madam.jpg"} className="col-span-4 row-span-6 object-cover rounded-md w-full h-[37rem]" width={443} height={681} alt="Korea" />
                <Image src={"/images/kru.jpg"} className="col-span-3 row-span-6 object-cover rounded-md w-full h-[37rem]" width={312} height={1107} alt="Korea" />
                <Image src={"/images/kshrd.jpg"} className="col-span-5 row-span-4 object-cover rounded-md w-full h-[24rem]" width={551} height={367} alt="Korea" />
                <Image src={"/images/group.jpg"} className="col-span-7 row-span-6 object-cover rounded-md w-full h-[37rem]" width={774} height={458} alt="Korea" />
                <Image src={"/images/member.jpg"} className="col-span-5 row-span-4 object-cover rounded-md w-full h-[24rem]" width={551} height={350} alt="Korea" />
            </section>

            <div className="pd-screen  mt-20 text-center">
                <HeadingTitle title="OUR" highlight="STRATEGY" />
            </div>
            <div className="mt-10">
                <h1 className="text-center text-h6 text-grey-900">
                    Our approach combines rigorous research, technological
                    innovation, and museum partnerships to create the definitive
                    museum resource:
                </h1>
                <div className="pd-screen container mt-10">
                    <div>
                        <div className="flex items-center mt-10 gap-2">
                            <span className="text-s1 text-white bg-red-700 rounded-full w-10 h-10 flex items-center justify-center">
                                1
                            </span>
                            <div></div>
                            <h1 className="text-red-700 text-h4">
                                Comprehensive Coverage
                            </h1>
                        </div>
                        <h1 className="pd-screen ml-4 text-h6 text-grey-900">
                            We&apos;re methodically documenting every museum
                            worldwide, from major institutions to niche
                            collections, ensuring no cultural gem goes
                            undiscovered.
                        </h1>
                    </div>
                    <div>
                        <div className="flex items-center mt-10 gap-2">
                            <span className="text-s1 text-white bg-red-700 rounded-full w-10 h-10 flex items-center justify-center">
                                2
                            </span>
                            <div></div>
                            <h1 className="text-red-700 text-h4">
                                Authentic Representation
                            </h1>
                        </div>
                        <h1 className="pd-screen ml-4 text-h6 text-grey-900">
                            We work directly with museums to ensure information
                            is accurate and presentations reflect each
                            institution&apos;s unique character and mission.
                        </h1>
                    </div>
                    <div>
                        <div className="flex items-center mt-10 gap-2">
                            <span className="text-s1 text-white bg-red-700 rounded-full w-10 h-10 flex items-center justify-center">
                                3
                            </span>
                            <div></div>
                            <h1 className="text-red-700 text-h4">
                                Visitor-Centric Design
                            </h1>
                        </div>
                        <h1 className="pd-screen ml-4 text-h6 text-grey-900">
                            Every feature is developed based on extensive
                            visitor research, making cultural trip planning
                            effortless and enjoyable.
                        </h1>
                    </div>
                </div>
            </div>
            <div className="pd-screen  mt-20 text-center">
                <HeadingTitle title="OUR" highlight="MENTORS" />
            </div>

            <section className="pd-screen container mt-20 w-full  grid grid-cols-2 gap-8">
                {MENTORS.map((data, index) => (
                    <div
                        key={data.id}
                        className={
                            MENTORS.length % 2 !== 0 &&
                                index === MENTORS.length - 1
                                ? "col-span-2 flex justify-center"
                                : ""
                        }
                    >
                        <MentorCard
                            name={data.name}
                            position={data.position}
                            image={data.image}
                            description={data.description || ""}
                            id={data.id}
                        />
                    </div>
                ))}
            </section>

            <div className="pd-screen mt-20 text-center">
                <HeadingTitle title="OUR" highlight="TEAM MEMBER" />
            </div>
            <section className="mt-20 grid grid-cols-3 w-full pd-screen container gap-8">
                {MEMBERS.map((data, index) => (
                    <div
                        key={data.id}
                        className={
                            MEMBERS.length % 3 !== 0 &&
                                index === MEMBERS.length - 1
                                ? "col-span-3 flex justify-center items-center px-8 [&>*]:w-1/3"
                                // ? "col-span-3 flex justify-center items-center"
                                : ""
                        }
                    >
                        <MemberCard
                            name={data.name}
                            roles={data.roles}
                            image={data.image}
                            description={data.description || ""}
                            id={data.id}
                        />
                    </div>
                ))}
            </section>
        </>
    );
}
