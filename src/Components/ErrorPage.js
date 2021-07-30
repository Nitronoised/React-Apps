
function Error({ image, message }) {
    console.log(message)
    return (
        <div className="error-box">
            <img style={{ marginTop: '250px', height: '130px' }} src={image} alt="Error 404" />
            <p>{message}</p>
        </div>
    )
}

export default Error