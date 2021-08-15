import Home from "@/views/Home";
import Mandelbrot from "@/views/Mandelbrot";
import Sierpinski from "@/views/Sierpinski";
import BuffonMonteCarlo from "@/views/BuffonMonteCarlo";

export default [
    {path: '/', name: 'Home', component: Home},
    {path: '/mandelbrot', name: 'Mandelbrot', component: Mandelbrot},
    {path: '/sierpinski', name: 'Sierpinski', component: Sierpinski},
    {path: '/buffonMonteCarlo', name: 'BuffonMonteCarlo', component: BuffonMonteCarlo},
]

