
class DuckDetails extends Landing {
    constructor(){
        super()

        this.state = { details: undefined }
        
        this.handleDetail = this.handleDetail.bind(this)

    }
    handleDetail(id) {
        logic.searchDucks(id, (error, detail) => {
            if (error) console.error(error)
            else this.setState({ detail })
        })
    }

    render() {
        return<>
            
            <Results items = {this.state.detail} paintItem={detail => {
                return <duckDetails detail={detail} />
            }} duckDetails = {this.handleDetail}/>
        </>
    }
  
}







duckDetails({ detail: { title, details, imageUrl, price, } }) {
    return <>
        <h3>{title}</h3>
        <p>{details}</p>
        <img src={imageUrl} />
        <span>{price}</span>
        <link href=""/>
        </>
}