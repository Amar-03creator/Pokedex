import './Pokemon.css'

function Pokemon ({name , image}){
    return (
        <div className='pokemon'> 
            <div className='pokemon-name'>{name}</div>
            <div><img className="POKEMON-IMAGE" src={image} alt={name} />   </div>

        </div>
    );
}
export default Pokemon;