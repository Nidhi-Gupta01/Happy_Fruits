function About() {
  return (
    <section
      id="about"
      className="bg-[#fff8ec] px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= TOP CONTENT ================= */}

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* LEFT CONTENT */}

          <div>

            <span className="font-semibold tracking-widest text-[#ff7114]">
              ABOUT HAPPY FRUITS
            </span>

            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#164d58] sm:text-5xl">
              Fresh Fruits.
              <span className="block text-[#ff7114]">
                Happy Moments.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Happy Fruits, we believe that healthy food should be
              fresh, delicious, colourful and easy to enjoy. Our goal is
              to bring nature's goodness closer to you with carefully
              selected fruits delivered straight to your doorstep.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              From everyday favourites to seasonal delights, every fruit
              is selected with freshness and quality in mind. We want to
              make choosing healthy food a simple and enjoyable experience
              for individuals, families and everyone who loves fresh
              fruits.
            </p>

            {/* Small highlights */}

            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">

              <div>
                <h3 className="text-2xl font-extrabold text-[#164d58]">
                  100%
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Fresh Selection
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-[#164d58]">
                  Fresh
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Everyday Delivery
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-[#164d58]">
                  24/7
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Happy Eating
                </p>
              </div>

            </div>

          </div>


          {/* RIGHT CONTENT */}

          <div className="relative flex min-h-[430px] items-center justify-center">

            {/* Background Circle */}

            <div className="
              absolute
              h-[330px]
              w-[330px]
              rounded-full
              bg-[#ffe3bd]
              sm:h-[390px]
              sm:w-[390px]
            " />

            {/* Fruits */}

            <img
              src="/fruits/orange.png"
              alt="Fresh orange"
              className="
                absolute
                left-4
                top-16
                w-36
                rotate-[-12deg]
                drop-shadow-lg
                sm:left-12
                sm:w-44
              "
            />

            <img
              src="/fruits/mango.png"
              alt="Fresh mango"
              className="
                absolute
                right-3
                top-20
                w-36
                rotate-[10deg]
                drop-shadow-lg
                sm:right-10
                sm:w-44
              "
            />

            <img
              src="/fruits/strawberry.png"
              alt="Fresh strawberry"
              className="
                absolute
                bottom-12
                left-16
                w-28
                rotate-[-8deg]
                drop-shadow-lg
                sm:left-24
                sm:w-32
              "
            />

            <img
              src="/fruits/pineapple.png"
              alt="Fresh pineapple"
              className="
                absolute
                bottom-5
                right-12
                w-36
                rotate-[8deg]
                drop-shadow-lg
                sm:right-20
                sm:w-44
              "
            />

            {/* Center Message */}

            <div className="
              relative
              z-10
              flex
              h-44
              w-44
              flex-col
              items-center
              justify-center
              rounded-full
              bg-white
              text-center
              shadow-xl
              sm:h-52
              sm:w-52
            ">

              <span className="text-4xl">
                🍊
              </span>

              <h3 className="mt-2 text-xl font-extrabold text-[#164d58]">
                Eat Fresh
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Live Happy
              </p>

            </div>

          </div>

        </div>


        {/* ================= VALUES ================= */}

        <div className="mt-24">

          <div className="text-center">

            <span className="font-semibold tracking-widest text-[#ff7114]">
              WHY HAPPY FRUITS
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#164d58] sm:text-4xl">
              What Makes Us Different?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              We focus on making fresh fruit shopping simple,
              convenient and enjoyable.
            </p>

          </div>


          {/* Value Cards */}

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}

            <div className="
              rounded-3xl
              bg-white
              p-8
              shadow-sm
              transition
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
            ">

              <div className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-[#fff0dc]
                text-3xl
              ">
                🍎
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#164d58]">
                Carefully Selected
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                We believe good food starts with good ingredients.
                Our fruits are selected with freshness, quality and
                taste in mind.
              </p>

            </div>


            {/* Card 2 */}

            <div className="
              rounded-3xl
              bg-white
              p-8
              shadow-sm
              transition
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
            ">

              <div className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-[#e5f4e7]
                text-3xl
              ">
                🍃
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#164d58]">
                Freshness First
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                From selection to delivery, our focus is to help you
                enjoy fruits that look fresh, taste delicious and
                bring more goodness to your day.
              </p>

            </div>


            {/* Card 3 */}

            <div className="
              rounded-3xl
              bg-white
              p-8
              shadow-sm
              transition
              duration-300
              hover:-translate-y-2
              hover:shadow-xl
            ">

              <div className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-[#fff0dc]
                text-3xl
              ">
                ❤️
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#164d58]">
                Made With Care
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Happy Fruits is built around a simple idea:
                making healthy choices easier while adding a little
                happiness to everyday life.
              </p>

            </div>

          </div>

        </div>


        {/* ================= BOTTOM STORY ================= */}

        <div className="
          mt-20
          rounded-3xl
          bg-[#164d58]
          px-7
          py-12
          text-center
          text-white
          sm:px-12
        ">

          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Our Promise to You 🍊
          </h2>

          <p className="
            mx-auto
            mt-5
            max-w-3xl
            text-base
            leading-8
            text-white/75
            sm:text-lg
          ">
            We want every Happy Fruits experience to feel simple,
            fresh and delightful. Whether you are ordering a box for
            yourself, your family or someone special, we are here to
            make every bite a little happier.
          </p>

          <a
            href="#fruits"
            className="
              mt-7
              inline-block
              rounded-full
              bg-[#ff7114]
              px-8
              py-3.5
              font-bold
              text-white
              shadow-lg
              transition
              hover:-translate-y-1
              hover:bg-[#e96109]
            "
          >
            Explore Our Fruits
          </a>

        </div>

      </div>
    </section>
  );
}

export default About;