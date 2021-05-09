import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'


export default function NominatedList({ Title, removeNominated }) {
    return (
        <div className="title" >
            <Row>
                { Title }
                <Button type="button" onClick={() => removeNominated(Title)}>Remove</Button>
            </Row>
        </div>
    )
}
