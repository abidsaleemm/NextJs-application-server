import React from 'react';
import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';

// Global styles can go here
export default WrappedComponent => ({ ...props }) => (
      <div>
          <style dangerouslySetInnerHTML={{ __html: styleBootstrap }} />  
          <WrappedComponent { ...props } />
      </div>
    );
