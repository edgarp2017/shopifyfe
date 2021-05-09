import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


export default function SearchResults({ Title, Year, Poster, checkNominated, addNominated, removeNominated }) {
    let button;
    
    if (checkNominated(Title) === "Done") {
        button = (<div />)
    }
    else if (checkNominated(Title) === false) {
        button = (<Button type="button" onClick={() => addNominated(Title)}>Add</Button>);
    }
    else {
        button = (<Button type="button" onClick={() => removeNominated(Title)}>Remove</Button>)
    }
        
    return (
        <Card className="mt-4 results" >
            <Card.Img src={Poster} height={400} alt="Card image" />
            <Card.ImgOverlay>
                <Card.Title>{Title}, {Year} { button }</Card.Title>
            </Card.ImgOverlay>
        </Card >
    )
}
