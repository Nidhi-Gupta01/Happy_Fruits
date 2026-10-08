function SectionHeading({ title, description }) {
  return (
    <div className="text-center">

      <h2 className="text-3xl font-extrabold text-[#164d58] sm:text-4xl">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-gray-600">
        {description}
      </p>

    </div>
  );
}

export default SectionHeading;