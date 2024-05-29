interface Props {
  title: string;
  date: {
    month: string;
    day: number;
  };
  newPost: boolean;
}

const FirstPost = ({ title, date, newPost }: Props) => {
  const isTrue = () => {
    if (newPost) {
      console.log("THIS IS NEW POST");
    } else {
      console.log("THIS IS OLD POST");
    }
  };
  return (
    <div>
      <div>THis is first post</div>
      <h1>{title}</h1>
      <h2>
        {date.day} {date.month}
      </h2>
      <button className="border bg-yellow-300" onClick={() => isTrue()}>
        is True?
      </button>
    </div>
  );
};

export default FirstPost;
