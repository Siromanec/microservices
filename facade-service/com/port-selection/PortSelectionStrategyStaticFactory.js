const {SinglePortSelectionStrategy} = require("./strategy/SinglePortSelectionStrategy");
const {RandomPortSelectionStrategy} = require("./strategy/RandomPortSelectionStrategy");

class PortSelectionStrategyStaticFactory {
    /**
     * @public
     * @param {string | undefined} portsEnvVar
     * @return {IPortSelectionStrategy | undefined}
     */
    static get(portsEnvVar) {
        if (portsEnvVar === undefined) {
            return new SinglePortSelectionStrategy(undefined);
        }

        const ports = portsEnvVar.split(" ");

        if (ports.length === 1) {
            return new SinglePortSelectionStrategy(ports[0]);
        }
        return new RandomPortSelectionStrategy(ports);
    }
}

module.exports = {PortSelectionStrategyStaticFactory}
