import Card from 'react-bootstrap/Card'

export default function SearchBox({ handleChange }) {
    return (
        <Card>
            <Card.Body>
                <h3>Movie Title</h3>
                <input type='text' id='lname' name='lname' onChange={handleChange} className="mt-3 mb-3 searchbox" />
            </Card.Body>
        </Card>
    )
}
