const VideoSec = () => {
  return (
    <section className="banner_video">
      <div className="video_wrap">
        <video className="video" width={800} autoPlay loop muted>
          <source src="/video/banner.mp4" />
        </video>
      </div>
      <div className="text_wrap">
        <div className="text">
          <div className="text_a">건강을 지키는 삶, </div>
          <div className="text_b">&nbsp;&nbsp; 우리 모두의 내일</div>
        </div>
      </div>
    </section>
  );
};

export default VideoSec;
