module.exports = (({
    ...adapter,
    getStudies,
    getStudy
}) => ({
        ...adapter,
        getStudies: async () => {
            const studies = await getStudies()
            return studies.map(({ ...study, patientName = '' }) => ({
                ...study,
                patientName: patientName.replace(/\^/g, ' ')
            }));
        },
        getStudy: async (props) => {
            const { patientName = '', ...study } = await getStudy(props);
            return ({
                ...study,
                patientName: patientName.replace(/\^/g, ' ')
            })
        }
    }))(process.env.LOCAL !== undefined ?
        require('./adapterLocal') :
        require('./adapterAzure'));
