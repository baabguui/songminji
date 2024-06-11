import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/CV.css";

const CV = () => {
  return (
    <>
      <Header isHome={false} />
      <div className="CVContainer">
        <p className="name">SONG MIN JI</p> <br />
        Lives and Works in Seoul <br /> <br />
        <p className="category">학력</p> <br />
        2021 서울과학기술대학교 조형예술과 학사 졸업 <br />
        <br />
        <p className="category">개인전</p> <br />
        2024 WELL, 인터럼, 서울, 한국 <br />
        <br />
        <p className="category">단체전</p> <br />
        2023 4 needles, 에브리아트, 서울, 한국 <br />
        <br />
        2023 QUEST, 갤러리 인 HQ, 서울, 한국
        <br /> <br />
        2022 Peer to Peer, 온수공간, 서울, 한국 <br />
        <br />
        2020 미리 찌는 살, WESS, 서울, 한국
        <br /> <br />
        2020 인류의 조상은 바나나, 가변크기, 서울, 한국 <br /> <br />
        <br />
        <p className="category">Education</p> <br />
        2021 BFA Fine Arts, Seoul National University of Science & Technology,
        Seoul <br /> <br />
        <p className="category">Solo Exhibitions</p>
        <br />
        2024 WELL, INTERIM, Seoul, Korea
        <br />
        <br />
        <p className="category">Group Exhibitions</p> <br /> 2023 4 needles,
        Every Art, Seoul, Korea <br />
        <br />
        2023 QUEST, Gallery IN HQ, Seoul, Korea <br /> <br />
        2022 Peer to Peer, ONSU GONG-GAN, Seoul, Korea <br /> <br />
        2020 Fatten for Tomorrow, WESS, Seoul, Korea <br /> <br /> 2020 인류의
        조상은 바나나, Dimension Variable, Seoul, Korea
        <br />
        <br />
        <p />
      </div>
      <Footer />
    </>
  );
};

export default CV;
