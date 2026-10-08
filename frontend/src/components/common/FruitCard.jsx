function FruitCard({ image, name }) {
  return (
    <a
      href="/shop"
      className="group block rounded-3xl bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Fruit Image */}
      <div className="flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-[#fff8ec]">
        <img
          src={image}
          alt={name}
          className="h-44 w-44 object-contain transition duration-500 group-hover:scale-110"
        />
      </div>

      {/* Fruit Name */}
      <div className="pt-5 text-center">
        <h3 className="text-xl font-bold text-[#164d58]">
          {name}
        </h3>

        {/* Shop Button */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#298447] px-6 py-3 font-bold text-white transition duration-300 group-hover:bg-[#216b38]">
          Shop Now
          <span>→</span>
        </div>
      </div>
    </a>
  );
}

export default FruitCard;