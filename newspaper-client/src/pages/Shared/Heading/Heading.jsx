const Heading = ({ heading }) => {
  return (
    <div className="mx-auto text-center md:w-4/12 my-8">
      <h2 className="text-3xl text-white uppercase border-y-4 py-4">
        {heading}
      </h2>
    </div>
  );
};

export default Heading;
