function FAQ({ question, answer }) {
  return (
    <details
      className="
        group
        rounded-2xl
        border
        border-gray-200
        bg-[#fffaf0]
        p-6
      "
    >

      <summary
        className="
          cursor-pointer
          list-none
          font-bold
          text-[#164d58]
        "
      >
        {question}
      </summary>

      <p className="mt-4 leading-7 text-gray-600">
        {answer}
      </p>

    </details>
  );
}

export default FAQ;