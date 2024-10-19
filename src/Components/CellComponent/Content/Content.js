import style from './Content.module.css'
function Content({label, children}){
    return(
        <div className = {style.container}>
                <div className = {style.label}>{label}: </div>
                <span className = {style.content}>{children}</span>
        </div>
    )
}
export default Content;