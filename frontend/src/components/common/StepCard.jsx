function StepCard({ number, title, description }) {
  return (
    <div
      className="
        rounded-3xl
        bg-[#fff8ec]
        p-8
        text-center
        shadow-sm
        transition
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
    >

      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#164d58]
          font-bold
          text-white
        "
      >
        {number}
      </div>

      <h3 className="mt-6 text-xl font-bold text-[#164d58]">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-gray-600">
        {description}
      </p>

    </div>
  );
}

export default StepCard;