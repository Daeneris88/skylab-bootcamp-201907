function DuckItem({ duck: { title, imageUrl, price, id } }) {
    return <>
        <h3>{title}</h3>
        <img src={imageUrl}/>
        <span>{price}</span>
    </>
}