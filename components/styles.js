import React from 'react';
import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';

// Global styles can go here
export default () =>
    <style dangerouslySetInnerHTML={{ __html: styleBootstrap }} global />  
