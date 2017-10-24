const setDefaults = ({ ...study, patientName = '' }) => ({
    ...Object
        .entries(study)
        .reduce((a, [k, v]) => ({ ...a, [k]: v === undefined ? '' : v }), {}),
    patientName: patientName.replace(/\^/g, ' ')
});

module.exports = (({
    ...adapter,
    getStudies,
    getStudy,
}) => ({
        ...adapter,
        getStudies: async () => {
            const studies = await getStudies();
            return studies.map(setDefaults);
        },
        getStudy: async (props) => setDefaults(await getStudy(props))
    }))(process.env.LOCAL !== undefined ?
        require('./adapterLocal') :
        require('./adapterAzure'));
