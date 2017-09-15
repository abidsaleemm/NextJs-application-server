export default (status = 'default') => ((statusNames = ({
    default: 'None',
    1: 'Created',
    2: 'Segmentation',
    3: 'Injuries',  
    4: 'Review',
    5: 'Done',
})) => 
    statusNames[status])();