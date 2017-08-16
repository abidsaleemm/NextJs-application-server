import React from 'react';
import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';

export default WrappedComponent => ({ ...props }) => (
      <div>
          <style dangerouslySetInnerHTML={{ __html: styleBootstrap }} />  
          <WrappedComponent { ...props } />
      </div>
    );

    //  {/* <style jsx global>  */}
        //  {/* </style>  */}
