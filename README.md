# Salesforce DX Project To Play around with Functions

##Install required dependency:
- Docker Desktop ([Windows](https://docs.docker.com/docker-for-windows/install/]), [Mac](https://docs.docker.com/docker-for-mac/install/))
- SLDS Evergreen Plugin `sfdx plugins:install evergreen`
- Run `npm install`

## Start working with Salesforce functions:
- Create your first function: `sfdx evergreen:function:create <MyFunction> -l javascript`
- Start your function from local from function folder: `sfdx evergreen:function:start --verbose`
- Invoke your new function: `sfdx evergreen:function:invoke http://localhost:8080 --payload='DATA_TO_USE_IN_FUNCTION' -u <your scratch org alias>`
- Login into your environment: `sfdx evergreen:auth:login` (A limited access developer preview of Evergreen will be available with the Spring ’21 release in February 2021)
- Deploy your function: `sfdx evergreen:function` (A limited access developer preview of Evergreen will be available with the Spring ’21 release in February 2021)

## Useful Links

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
- [Evergreen: Serverless Functions & Compute for Customer 360 Platform](https://developer.salesforce.com/blogs/2019/11/introducing-salesforce-evergreen.html)
