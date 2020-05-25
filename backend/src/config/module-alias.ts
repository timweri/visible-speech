import moduleAlias from "module-alias";
import appRootPath from "app-root-path";
import config from "./config";
import path from "path";

moduleAlias.addAliases({
    '@config': path.join(appRootPath.toString(), config.distDir, 'config'),
    '@routes': path.join(appRootPath.toString(), config.distDir, 'routes'),
    '@controllers': path.join(appRootPath.toString(), config.distDir, 'controllers'),
    '@utils': path.join(appRootPath.toString(), config.distDir, 'utils'),
    '@sockets': path.join(appRootPath.toString(), config.distDir, 'sockets'),
});
