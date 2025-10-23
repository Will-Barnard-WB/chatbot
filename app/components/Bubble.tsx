const Bubble = ({ message }) => {
    const { content, role } = message;

    return (
        <div className={`${role}`}>{content}</div>
    )
}

export default Bubble;