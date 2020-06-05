import moduleAlias from "module-alias";
import appRootPath from "app-root-path";
import config from "./config";
import path from "path";

moduleAlias.addAliases({
    '@config': path.join(appRootPath.toString(), config.distDir, 'config'),
});
