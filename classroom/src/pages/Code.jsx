import Highlight from 'react-highlight'
import "highlight.js/styles/stackoverflow-light.css"

const CodePage = ({json}) => {
    return (
        <>
            <div class={"row"}>
                <div class={"column code"}>
                    <Highlight className='java'>
                        {json["CodeA"]}
                    </Highlight>
                </div>
                <div class="column code">
                    <Highlight className='java'>
                        {json["CodeB"]}
                    </Highlight>
                </div>
            </div>
        </>
    )
};

export default CodePage;