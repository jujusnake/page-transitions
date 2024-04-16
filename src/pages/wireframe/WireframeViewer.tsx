import useBackground from "../../lib/useBackground";

type Props = { cardNum: number };

const WireframeViewer = ({ cardNum = 1 }: Props) => {
  console.log(cardNum);
  useBackground("#000000");

  return (
    <div className="flex items-center justify-center h-screen p-10 text-3xl font-bold text-white">
      이제 뷰어를 보여줄 페이지로 이동했습니다. <br />
      그러면 이제 각 뷰어에 맞는 로딩 화면을 보여주다가 로딩이 다되면 뷰어 보여주면 됩니다.
      <br />
      로딩화면은 방금 이동 전 페이지의 마지막 화면과 똑같이 맞춰서 페이지 이동을 했는지 뭘 했는지 모르게 유저를 속입니다
    </div>
  );
};

export default WireframeViewer;
