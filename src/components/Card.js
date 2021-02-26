const Card = (props) => {
  const { color, asignature, activity, content } = props.data;
  return (
    <div class="card">
      <div class={color}>
        <div class="title">
          <h2>{asignature}</h2>
        </div>
        <div class="content">
          <h2>{activity}</h2>
          <p>{content}</p>
        </div>
      </div>
      <a
        href="https://plataforma.maristastepic.digital/?redirect=0"
        class="button"
      >
        <i class="material-icons">attachment</i>
      </a>
    </div>
  );
};

export default Card;
