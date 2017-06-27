export default (status = 0) => ((statusNames = ({
    0: 'Uploaded',
    1: 'Segmentation',
    2: 'Injuries',  
    3: 'Review',
    4: 'Done',
})) => 
    statusNames[status] ? 
        statusNames[status] : statusNames[0])();