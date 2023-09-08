console.info('Running Bun.build');

const buildOutput = await Bun.build({
    root: '.',
    minify: {
        whitespace: true,
        syntax: true,
        identifiers: false,
    },
    outdir: 'build',
    entrypoints: ['src'],
    external: ['express', 'socket.io'],
    target: 'bun',
});


if (buildOutput.success) {
    console.info('Bun.build Completed Successfully', buildOutput);
} else {
    console.error('Bun.build Fail With Error', buildOutput);
    process.exit(1);
}