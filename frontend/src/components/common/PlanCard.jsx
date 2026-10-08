function PlanCard({
  title,
  price,
  description,
  popular = false,
}) {
  return (
    <div
      className={`
        relative
        rounded-3xl
        p-8
        text-center
        shadow-lg
        transition
        hover:-translate-y-2
        ${
          popular
            ? "scale-105 bg-[#164d58] text-white"
            : "bg-[#fff8ec] text-[#164d58]"
        }
      `}
    >

      {popular && (
        <span
          className="
            absolute
            right-5
            top-5
            rounded-full
            bg-[#ff7114]
            px-3
            py-1
            text-xs
            font-bold
            text-white
          "
        >
          POPULAR
        </span>
      )}

      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      <div className="mt-5 text-4xl font-extrabold">
        {price}
      </div>

      <p
        className={`
          mt-4
          ${popular ? "text-white/70" : "text-gray-600"}
        `}
      >
        {description}
      </p>

      <button
        className="
          mt-7
          rounded-full
          bg-[#ff7114]
          px-7
          py-3
          font-semibold
          text-white
          transition
          hover:bg-[#e96109]
        "
      >
        Choose Plan
      </button>

    </div>
  );
}

export default PlanCard;