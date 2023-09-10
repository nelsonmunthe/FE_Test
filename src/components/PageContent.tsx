const PageContent:React.FC<{title: string, children: any}> = (props) => {
    const { title, children } = props;
    document.title = title;
    console.log('page content')
    return(
        <div className='flex flex-col justify-left m-auto w-11/12'>
            {children}
        </div>
    )
};

export default PageContent;