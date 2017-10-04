const initialState = process.env.NODE_ENV === 'dev' ? 
    'http://localhost:8081' : '/static/interface';

export default (state = initialState, { type }) => {
    switch(type) {
        default: return state;
    }
};