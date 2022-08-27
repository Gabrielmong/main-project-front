import logo from "../../assets/images/empanada.png";

const stats = [
  { label: "Founded", value: "2021" },
  { label: "Members", value: "4" },
  { label: "Projects Done", value: "11" },
  { label: "Raised", value: "$0, debt likely" },
];

export const About = () => {
  return (
    <>
      <div className="relative bg-em_white py-5 sm:py-6 h-fc">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start pb-10">
          <div className="relative sm:py-16 lg:py-0">
            <div
              aria-hidden="true"
              className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
            >
              <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
              <svg
                className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                width={404}
                height={392}
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={392}
                  fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
                />
              </svg>
            </div>
            <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
              <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://c.tenor.com/ZydWxPTppJIAAAAC/tridance-yellow-triangle.gif"
                  alt="Triangle"
                />
                <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t " />
                <div className="relative px-8">
                  <div>
                    <img className="h-12" src={logo} alt="Empanadas Review" />
                  </div>
                  <blockquote className="mt-8">
                    <div className="relative text-lg font-medium text-white md:flex-grow">
                      <p className="relative">
                        Empanadas Review is a platform for reviewing and sharing
                        the best empanadas in the world.
                      </p>
                    </div>

                    <footer className="mt-4 bg-transparent">
                      <p className="text-base font-semibold text-indigo-200 bg-transparent">
                        Dream Team
                      </p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
            {/* Content area */}
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
                Dream Team
              </h2>
              <div className="mt-6 text-gray-500 space-y-6">
                <p className="text-lg">
                  DreamTeam was created by four students from the Fidélitas University,
                   trying to get through by sticking together and completing
                  every assignment in the best way possible.
                </p>
                <p className="text-base leading-7">
                  Each member has a different skillset, Lucía knows lots of security and databases, 
                  Esteban has a great understanding of documentation and user interfaces, Bradley has 
                  extensive knowledge in security, and Gabriel handles the code's logic, or 
                  infrastructure. He also manages the team very well. 
                </p>
                <p className="text-base leading-7">
                  Met in the second quarter of 2021, and since, developing and maintaining the
                  great team we are.
                </p>

                <p className="text-base leading-7">
                  Thank you for considering us as the best we page for reviews! We are improving our
                  website to provide you the best user experience and also the most efficient info.
                </p>
              </div>
            </div>

            {/* Stats section */}
            <div className="mt-10">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-t-2 border-gray-100 pt-6"
                  >
                    <dt className="text-base font-medium text-gray-500">
                      {stat.label}
                    </dt>
                    <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
