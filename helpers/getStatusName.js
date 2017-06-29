export default (status = 'default') => ((statusNames = ({
    default: '',
    0: 'Created',
    1: 'Segmentation',
    2: 'Injuries',  
    3: 'Review',
    4: 'Done',
})) => 
    statusNames[status])(); // TODO Add a default?