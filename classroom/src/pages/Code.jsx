import Highlight from 'react-highlight'
import "highlight.js/styles/stackoverflow-light.css"

const CodePage = ({json}) => {
    return (
        <>
            <div className={"row"}>
                <div className={"column code"}>
                    <Highlight className='java'>
                        {json["CodeA"]}
                    </Highlight>
                </div>
                <div className="column code">
                    <Highlight className='java'>
                        {json["CodeB"]}
                    </Highlight>
                </div>
            </div>
        </>
    )
};

export default CodePage;