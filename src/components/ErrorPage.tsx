import PageContent from "./PageContent";
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage:React.FC = () => {

    const error = useRouteError() as Error;;

    let title = 'An error occurred!';
    let message = 'Something went wrong!';
   
    if (isRouteErrorResponse(error)) {
      if (error.status === 500) {
        message = error.statusText === '' ? 'Not Found' : error.statusText
      }
    
      if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page.';
      }
  }
   
  return(
      <PageContent title={title}>
          <p>{message}</p>
      </PageContent>
  )
};

export default ErrorPage;