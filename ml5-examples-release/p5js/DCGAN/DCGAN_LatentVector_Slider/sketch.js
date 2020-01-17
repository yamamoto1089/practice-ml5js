// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
DCGAN example
=== */

let dcgan;

// vector 1
let a = [];
// vector 2
let b = [];
// vector to interpolate between 1 and 2
let c = [];

let slider;

function preload() {
    dcgan = ml5.DCGAN('model/geo/manifest.json');
}

function setup() {
    createCanvas(600, 600);

    // create 2 arrays to hold random values for our latent vector
    for (let i = 0; i < 128; i++) {
        a[i] = random(-1, 1);
        b[i] = random(-1, 1);
    }
    slider = createSlider(0, 1, 0.5, 0.01);
    slider.input(generate);

    // generate an image on load
    generate();
}


function generate() {
    let amt = slider.value();
    // fill the latent vector with the interpolation between a and b
    for (let i = 0; i < 128; i++) {
        c[i] = lerp(a[i], b[i], amt);
    }
    dcgan.generate(displayImage, c);
}

function displayImage(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    image(result.image, 0, 0, width, height);
}