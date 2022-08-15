class NeuralNetwork{
    constructor(neuronCounts){
        this.levels = [];
        for(let i = 0; i < neuronCounts.length - 1; i++){
            this.levels.push(new LinearLayer(
                neuronCounts[i], neuronCounts[i + 1]
            ));
        }
    }

    static feedForward(givenInputs, network){
        let outputs = LinearLayer.feedForward(givenInputs, network.levels[0]);
        // console.log(network.levels[0].weights);
        for(let i = 1; i < network.levels.length; i++){
            outputs = LinearLayer.feedForward(
                outputs, network.levels[i]
            );
        }
        return outputs;
    }
}
class LinearLayer{
    constructor(inputs, outputs){
        this.inputs = new Array(inputs);
        this.outputs = new Array(outputs);
        this.biases = new Array(outputs);
        this.weights = [];
        for (let i = 0; i < inputs; i++){
            this.weights[i] = new Array(outputs);
        }
        LinearLayer.#randomize(this);
    }

    static #randomize(level){
        for(let i = 0; i < level.inputs.length; i++){
            for(let j = 0; j < level.outputs.length; j++){
                level.weights[i][j] = (Math.random() * 2) - 1;
            }
        }
        for(let i = 0; i < level.biases.length; i++){
            level.biases[i] = Math.random() * 2 - 1;
        }
    } 

    static feedForward(givenInputs, level){
        for(let i = 0; i < level.inputs.length; i++){
            level.inputs[i] = givenInputs[i];
        }
        for(let i = 0; i < level.outputs.length; i++){
            let sum = 0;
            for(let j = 0; j < level.inputs.length; j++){
                sum += level.inputs[j] * level.weights[j][i];
            }
            if (sum > level.biases[i]){
                level.outputs[i] = 1;
            }else{
                level.outputs[i] = 0;
            }
        }
        return level.outputs;
    }
}