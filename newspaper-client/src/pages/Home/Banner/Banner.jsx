import { Typewriter } from "react-simple-typewriter";
const Banner = () => {
  return (
    <div className="relative h-screen mt-5">
      <div
        className="absolute inset-0 flex items-center bg-fixed"
        style={{
          backgroundImage:
            'url("https://i.ibb.co/S6MFQ36/photo-1485988412941-77a35537dae4.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 text-center text-white flex items-center h-full">
        <div className="mx-auto p-8">
          <div className="text-center my-11 text-3xl font-medium">
            <Typewriter
              words={[
                "Welcome to the Newspaper!",
                "Stay Informed!",
                "Discover Exciting Stories!",
              ]}
              loop={100}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </div>
          <p className="uppercase text-lg font-bold">
            Author Your Story: Contribute to Todays News
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
