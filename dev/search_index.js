var documenterSearchIndex = {"docs":
[{"location":"getting_started/#Getting-Started-1","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"The best way to learn how to use VIDA is to look at some of the example notebooks provided.","category":"page"},{"location":"getting_started/#Installation-1","page":"Getting Started","title":"Installation","text":"","category":"section"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"VIDA isn't yet registered. To install the pkg type","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"using Pkg; Pkg.add(PackageSpec(url=\"https://github.com/ptiede/VIDA.jl.git\"))","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"Or go to the repl and simply type ]add https://github.com/ptiede/VIDA.jl.git.","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"Some additional dependencies that enable full functionality can be added with","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"Pkg.add.([\"Optim\",\"PyPlot\",\"FITSIO\",\"ArgParse\"])","category":"page"},{"location":"getting_started/#Idea-behind-VIDA-1","page":"Getting Started","title":"Idea behind VIDA","text":"","category":"section"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"VIDA is based on the idea of intrepreting the image as a probility distribution. Namely since any image is integrable, the space of images is in one-to-one correspondence with a probability distribution, especially since the total flux of the image is already known a priori.","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"Therefore, our idea is very close to variational inference, hence the name Variational Image Domain Analysis. Namely, where we view the image as a distribution and we aim to find a approximation of the distribution given some parameteric family f_theta(xy), which for our purproses we will typically call a filter. ","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"The choice of filter, depends on the problem of interest, namely what features we are interested in. Typically for the EHT where our images tend to be rings, we are interested in","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"Radius r₀\nWidth or half width σ\nStructural asymmetry τ\nFlux asymmetry s\nPosition angle ξ","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"VIDA then defines a series of filters parameterize these features.","category":"page"},{"location":"getting_started/#Filters-1","page":"Getting Started","title":"Filters","text":"","category":"section"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"Currently we have 5 filters defined, although they all belong to the same family. For an example on how to see the process for defining your own filter please see the readme.","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"The filters implemented are:","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"GaussianRing which is a symmetric and circular Gaussian ring.\nSlashedGaussianRing which is a circular Gaussian ring with a flux gradient across its emission.\nEllipticalGaussianRing symmetric Gaussian elliptical ring, where the emission is constant across the ring, unlike with the SlashedGaussianRing.\nGeneralGaussianRing A combination of the two above where the ring is allowed to be elliptical and have a intensity gradient.\nTIDAGaussianRing The GeneralGaussianRing, but where the asymmetry and flux orienation are fixed relative to one another.\nAsymGaussian A asymmetric Gaussian blob. This can be useful if you image has a strong non-ring component in it.\nConstant Adds a constant flux floor to the image. This is very helpful for image reconstructions that tend to add small scale flux everywhere in the image.","category":"page"},{"location":"getting_started/#Divergences-1","page":"Getting Started","title":"Divergences","text":"","category":"section"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"In order to extract features we first need a cost function that penalized our parameterized distributions f_theta(xy). Since we are considering the image as a probability distribution, one cost function would be the distance or divergence between two distributions. A probability divergence is just a functional that takes in two probability distributions p,q and is minimized iff pequiv q.","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"Currently we have two divergences implemented in VIDA","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"Bhattacharyya divergence (Bh)","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":" Bh(f_thetaI) = int sqrtf_theta(xy)I(xy) dxdy","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"KL divergence ","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":" KL(f_thetaI) = int f_theta(xy)logleft(fracf_theta(xy)I(xy)right)dxdy ","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"Both divergences give very similar answers, although we found the BH to be easier to maximize.","category":"page"},{"location":"getting_started/#","page":"Getting Started","title":"Getting Started","text":"For an example of how all this all works is given in the examples folder.","category":"page"},{"location":"function_index/#API-1","page":"API","title":"API","text":"","category":"section"},{"location":"function_index/#","page":"API","title":"API","text":"","category":"page"},{"location":"function_index/#","page":"API","title":"API","text":"Modules = [VIDA]","category":"page"},{"location":"function_index/#VIDA.VIDA","page":"API","title":"VIDA.VIDA","text":"VIDA\n\nIs a image feature extraction tool for use with EHT images of black holes. It assumes that the image is close to one of the filters we have implemented and then tries to extract that feature from the image using one of the probability divergences implemented.\n\n\n\n\n\n","category":"module"},{"location":"function_index/#VIDA.AsymGaussian","page":"API","title":"VIDA.AsymGaussian","text":"struct AsymGaussian <: VIDA.AbstractFilter\n\nAn asymmetric Gaussian blob.\n\nDetails\n\nDefines a asymmetric Gaussian image. This is useful if the image has some non-ring emission in the and you need to soak up some of the flux.\n\nThe parameters of the model follow very closely to those used in Themis. The Gaussian size σ is given by     σ = √(σxσy)     τ = 1-σy/σx, where σx,σy are the semi-major,minor axis lenght respectively. This is similar to how the asymmetry for the EllipticalGaussianRing.\n\nFields\n\nσ\nGaussian size in μas\nτ\nGaussian asymmetry\nξ\nGaussian orientation in radians measured north of east\nx0\nx position of Gaussian center in μas\ny0\ny position of Gaussian center in μas\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.EHTImage","page":"API","title":"VIDA.EHTImage","text":"struct EHTImage{T<:AbstractArray} <: VIDA.AbstractFitsImage\n\nDetails\n\nThe trait is to hold a EHT image tyically in matrix form. Namely the trait will typically be Matrix{Float64}.\n\nnx is the number of pixels in the x or RA direction ny is the number of pixels in the y or DEC direction psize_x, psize_y are the pixel sizes in the x and y direction source is the source we are looking at e.g. M87 ra,dec are the sources RA and DEC in J2000 coordinates using degrees wavelength is the wavelength of the image. mjd is the Modified Julian Date of the observation. img is the actual pixeled image.\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.EllipticalGaussianRing","page":"API","title":"VIDA.EllipticalGaussianRing","text":"struct EllipticalGaussianRing <: VIDA.AbstractFilter\n\nImplements the elliptical gaussian ring filter. Where the ellipticity tau is defined as one minus ratio between the semi-minor and semi-major axis.\n\nDetails\n\nAdds ellipticity to the ring. The radius r0 of the ring is now defined as the geometric mean of the semi-major (a) and semi-minor (b) axis lengths i.e.\n\nr0 = √(a*b).\n\nThe ellipticity τ is given by τ = 1-b/a.\n\nFields\n\nr0\nRadius of the Gaussian ring\nσ\nStandard deviation of the width of the Gaussian ring\nτ\nAsymmetry of the Gaussian ring defined as 1-ba\nξ\nAsymmetry orientation in radians measured north of east\nx0\nx position of the center of the ring in μas\ny0\ny position of the center of the ring in μas\n\nNotes\n\nThere is no normalization since the ellipticity makes it impossible to normalize analytically. In fact the distance from the ellipse is implemented numerically using an algorithm adapted from git\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.GaussianRing","page":"API","title":"VIDA.GaussianRing","text":"struct GaussianRing <: VIDA.AbstractFilter\n\nSymmetric gaussian ring filter. This is the most basic filter and just attempts to recover a location x0,y0, radius r0 and thickness σ from some image.\n\nFields\n\nr0\nRadius of Gaussian ring in μas\nσ\nStandard deviation of Gaussian ring in μas\nx0\nx location of the center of the Gaussian ring in μas\ny0\ny location of the center of the Gaussian ring in μas\n\nExample\n\nGaussianRing(r0=20.0,σ=5.0,x0=0.0,y0=-10.0)\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.GeneralGaussianRing","page":"API","title":"VIDA.GeneralGaussianRing","text":"struct GeneralGaussianRing <: VIDA.AbstractFilter\n\nCreates the most general elliptical slashed gaussian ring model. It is a combination of the elliptical and slashed gaussian ring. The direction of the slash and the ellipticity are not aligned or anti-aligned like with the TIDAGaussianRing type.\n\nDetails\n\nAdds ellipticity to the ring. The radius r0 of the ring is now defined as the geometric mean of the semi-major (a) and semi-minor (b) axis lengths i.e.\n\nr0 = √(a*b).\n\nThe ellipticity τ is given by τ = 1-b/a.\n\nFields\n\nr0\nRadius of the Gaussian ring\nσ\nStandard deviation of the width of the Gaussian ring\nτ\nAsymmetry of the Gaussian ring defined as 1-ba\nξτ\nAsymmetry orientation in radians, measured north of east\ns\nSlash of Gaussian ring.\nξs\nSlash orientation in radians measured north of east\nx0\nx position of the center of the ring in μas\ny0\ny position of the center of the ring in μas\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.SlashedGaussianRing","page":"API","title":"VIDA.SlashedGaussianRing","text":"struct SlashedGaussianRing <: VIDA.AbstractFilter\n\nImplements the slashed gaussian ring filter, that uses a cosine to symmetrically implement the slash. While this is marginally more complicated that a linear slash, it has a number of benefits such as mainting the azimuthal and smooth structure of the image.\n\nFields\n\nr0\nRadius of the ring in μas\nσ\nStandard deviation of Gaussian ring in μas\ns\nSlash strength of Gaussiang ring. 0 means no slash\nξ\nRotation angle in radians of slash direction, measured north of west\nx0\nx position of the center of the ring in μas\ny0\ny position of the center of the ring in μas\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.TIDAGaussianRing","page":"API","title":"VIDA.TIDAGaussianRing","text":"struct TIDAGaussianRing <: VIDA.AbstractFilter\n\nCreates the filter from the Paper I am writing. It is a combination of the elliptical and slashed gaussian ring. The slash and the semi-major axis are either aligned if the slash parameter s>0 or antialigned if s<0.\n\nDetails\n\nAdds ellipticity to the ring. The radius r0 of the ring is now defined as the geometric mean of the semi-major (a) and semi-minor (b) axis lengths i.e.\n\nr0 = √(a*b).\n\nThe ellipticity τ is given by τ = 1-b/a.\n\nFields\n\nr0\nRadius of the Gaussian ring\nσ\nStandard deviation of the width of the Gaussian ring\nτ\nAsymmetry of the Gaussian ring defined as 1-ba\ns\nSlash of Gaussian ring.\nξ\nSlash/Asymmetry orientation in radians measured north of east\nx0\nx position of the center of the ring in μas\ny0\ny position of the center of the ring in μas\n\n\n\n\n\n","category":"type"},{"location":"function_index/#PyPlot.plot-Tuple{VIDA.AbstractImage}","page":"API","title":"PyPlot.plot","text":"Plots the image being read in.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#PyPlot.plot-Union{Tuple{T}, Tuple{T}} where T<:EHTImage","page":"API","title":"PyPlot.plot","text":"where image is templated off of EHTImage struct.\n\nDetails\n\nThis was created to be close to the ehtim display object. It takes an EHTImage object and plots it using PyPlot, returning the figure.\n\nNote that is does not save the figure.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.bbextract-Union{Tuple{T}, Tuple{Any,T,Any,Any,Vararg{Any,N} where N}} where T<:VIDA.AbstractFilter","page":"API","title":"VIDA.bbextract","text":"bbextract(divergence, θinit, lbounds, ubounds, args; kwargs...)\n\n\nFunction uses the BlackBoxOptim package to minimize the divergence function. The output from this is then passed to extract to use a deterministic minimizer to find the true minimum.\n\nReturns a tuple with elements (filter, div_min, converged, iterations)\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.clipimage","page":"API","title":"VIDA.clipimage","text":"clipimage(clip, im)\nclipimage(clip, im, mode)\n\n\nClips the image im according to the value clip, which can either be an absolute flux in Jy/px or the intensity relative to the maximum.\n\n\n\n\n\n","category":"function"},{"location":"function_index/#VIDA.extract-Union{Tuple{T}, Tuple{Int64,Any,T,Any,Any}, Tuple{Int64,Any,T,Any,Any,Any,Vararg{Any,N} where N}} where T<:VIDA.AbstractFilter","page":"API","title":"VIDA.extract","text":"extract(nstart, divergence, θinit, lbounds, ubounds)\nextract(nstart, divergence, θinit, lbounds, ubounds, method, args; kwargs...)\n\n\nFunction that uses Optim.jl to minimize our divergence to extract the image features. divergence is our cost function to be optimized that is formed from make_bh. θinit, is the initial filter to use and must be a subtype of AbstractFilter. lbounds and ubounds are the upper and lower bounds of the problem. method is the maximization algorithm to use. For a list of availible methos see the Optim.jl package, as well as for the other various args, and kwargs that can be passed.\n\nNotes\n\nlbounds and ubounds will actually be evaluated, namely they must be included in the mode they form the closed hypercube of parameter space.\n\nAlso most of the filters aren't autodiffable right now so be careful with the autodiff feature.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.imagefilter-Tuple{Any,Any,VIDA.AbstractFilter}","page":"API","title":"VIDA.imagefilter","text":"imagefilter(x, y, θ)\n\n\nx, y are the image positions of the filter and θ is the filter type.\n\nDetails\n\nevaluates the image filter at the point x, y and returns its value, given the filter type θ.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.load_ehtimfits-Tuple{String}","page":"API","title":"VIDA.load_ehtimfits","text":"load_ehtimfits(fits_name)\n\n\nwhere fits_name should be a fits file generated using ehtim\n\nDetails\n\nThis reads in a fits file created using ehtim. This is because ehtim only outputs the image and not a separate HDU for the field, so the usual fits reader doesn't work properly.\n\nThe function returns an EHTImage object that contains the relevant image and parameters extracted from the fits file. It also ensures that we are astronomers and that the image using sky-left coordinates.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.make_div-Union{Tuple{T}, Tuple{T,Any}, Tuple{T,Any,Any}} where T<:EHTImage","page":"API","title":"VIDA.make_div","text":"make_div(image, div_type)\nmake_div(image, div_type, lreg)\n\n\nCreates the specfied divergence base on the image, and divergence type. The current options for the divergence are:\n\n:KL for the Kullback-Leiber divergence\n:Bh for the Bhattacharyya divergence, which is related to the Hellinger distance.\n\nDetails\n\nThis returns a close that you can use to calculate the divergence given some image filter θ.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.plot_triptic-Tuple{EHTImage,VIDA.AbstractFilter}","page":"API","title":"VIDA.plot_triptic","text":"plot_triptic(image, θ)\n\n\nPlots a triptic plot with the image, i.e. an EHT image and the filter heta used for parameter estimate. The first two panels are the image and filter and the third are RA and DEC cross-sections of both the filter and image.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.split-Tuple{VIDA.AbstractFilter}","page":"API","title":"VIDA.split","text":"split(θ)\n\n\nSplits the filter into an array with its subcomponents so you can easily access them.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.stack-Tuple","page":"API","title":"VIDA.stack","text":"stack(θ)\n\n\nStacks filters together so you can easily combine multiple filters. It does this by calling the :+ and :* method. Every filter added will include an additional parameter that controls the relative weight of each filter.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.unpack-Union{Tuple{T}, Tuple{T}} where T<:VIDA.AbstractFilter","page":"API","title":"VIDA.unpack","text":"unpack(θinit)\n\n\nUnpacks the parameters of the filter θ, except the last which is the boolean for if the filter is analytically normalized.\n\nReturns the parameters in a vector.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.AbstractFilter","page":"API","title":"VIDA.AbstractFilter","text":"abstract type AbstractFilter\n\nAn absract type that will contain the filter information, such as the parameters. Specific instanstantiations will need to be defined for you to use this. This is mainly for the imagefilter function\n\nDetails\n\nThis defined the highest function type. If you wish to implement your own filter you\nneed to define a a couple of things\n1. The filter type <: AbstractFilter\n2. an `imagefilter` function that defines the function\n3. an `size` function that defines the number of parameters of the filter.\n\nAn example is given by:\n\n#All of our composite type are defined using the Paramters.jl package to you\ncan directly refer to the struct parameters when creating it, although this isn't\nactually used anywhere in the code.\n@with_kw struct Gaussian <: AbstractFilter\n    σ::Float64\n    x0::Float64\n    y0::Float64\nend\n\n#Typically we inline and force the function to use fastmath\n@fastmath @inline function imagefilter(x,y,θ::Gaussian)\n    return 1.0/(2π*σ^2)*exp(-0.5*( (x-x0)^2+(y-y0)^2 ) )\nend\nsize(::Type{Gaussian}) = 3\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.AbstractFitsImage","page":"API","title":"VIDA.AbstractFitsImage","text":"An absract image that will hold a fits image after being created or parsed in. This will form the basis for most astronomical images that are defined.\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.AbstractImage","page":"API","title":"VIDA.AbstractImage","text":"An abstact type that acts as a wrapper for image objects used in astronomy.\n\nThis is the top of the castle for images and will be rarely touched. Basically unless you don't want to use fits images this will not be used\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.AddFilter","page":"API","title":"VIDA.AddFilter","text":"struct AddFilter{T1<:VIDA.AbstractFilter, T2<:VIDA.AbstractFilter} <: VIDA.AbstractFilter\n\nCombines two filters together into one object. Since addition is assoiciative this can actually we used to hold multiple different filters.\n\nDetails\n\nOverloads the Base.:+ function so you can easily add two filters together.\n\nExample\n\nθ1 = GaussianRing(10,5,0,0)\nθ2 = SlashedGaussianRing(15,5,0.5,π/4,0,0)\nθ12 = θ1+θ2\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.MulFilter","page":"API","title":"VIDA.MulFilter","text":"struct MulFilter{S<:Number, T<:VIDA.AbstractFilter} <: VIDA.AbstractFilter\n\nMultiplies filter by a constant. This is useful when combining with AddFilter since it will change the relative weights of each filter.\n\nDetails\n\nOverloads the Base.:* function so you can easily multiple a filter by a number.\n\nExample\n\nθ = GaussianRing(15,5,0.0,0.0)\n2*θ\n\n\n\n\n\n","category":"type"},{"location":"function_index/#VIDA.contrastboot-Tuple{Any,EHTImage}","page":"API","title":"VIDA.contrastboot","text":"contrastboot(β, im)\n\n\nBoosts the constrast of an image by a factor of β.\n\nDetails\n\nThe boosts the contrast of an image according to the formula\n\n I_beta(xy) = left(fracI(xy)I_maxright)^beta\n\nThis should rarely be used.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.downsample-Tuple{Int64,EHTImage}","page":"API","title":"VIDA.downsample","text":"downsample(factor, im)\n\n\nDown samples the image im by a factor\n\nDetails\n\nGiven an image im with Nxtimes Ny pixels, downsample converts that to an image with Nxfactor times Nyfactor pixels. This can be useful when the image has much higher resolutions than is needed for feature extraction.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.filter_image-Tuple{VIDA.AbstractFilter,Int64,Any,Any}","page":"API","title":"VIDA.filter_image","text":"filter_image(θ, npix, xlim, ylim)\n\n\nCreates an npix×npix rasterized image of the filter θ with limits xlim and ylim\n\nReturns the tuple (xitr,yitr,image) where xitr,yitr are the iterators defining the pixel locations (which are centered) and the rasterized image,  in Jy/μas^2.\n\nNote\n\nI use the pixel size definition fieldofview/npix, but the image is evaluated at the pixel centers.\n\nWe also use the astronomer orientation and ordering.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.make_bh-Union{Tuple{T}, Tuple{T}, Tuple{T,Any}} where T<:EHTImage","page":"API","title":"VIDA.make_bh","text":"make_bh(image)\nmake_bh(image, lreg)\n\n\nClosure that makes a Bhattacharyya divergence function based on the imagefilter and intrinsic image, image.\n\nDetails\n\nThis takes an imagefilter function and my intrinsic image and creates an function that return the Bhattacharyya divergence of the filter and the image.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.make_kl-Union{Tuple{T}, Tuple{T}, Tuple{T,Any}} where T<:EHTImage","page":"API","title":"VIDA.make_kl","text":"Closure that makes a Kullback-Leibler divergence based on the imagefilter and intrinsic image, image. That is it compute             D_{KL}(filter||image)\n\nDetails\n\nThis takes an imagefilter function and my intrinsic image and creates an function that returns the KL-divergence of the image, where the image is the distribution we are calculating the KL-divergence relative to.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.plot_filter-Union{Tuple{T}, Tuple{Any,T,Any,Any,Any}} where T<:VIDA.AbstractFilter","page":"API","title":"VIDA.plot_filter","text":"plot_filter(measure, θ, p1, p2, n)\n\n\nA plotting function used for benchmarking.\n\n\n\n\n\n","category":"method"},{"location":"function_index/#VIDA.window_image-Tuple{Any,Any,EHTImage}","page":"API","title":"VIDA.window_image","text":"window_image(domain_x, domain_y, im)\n\n\nGiven an image im it selects a new field of view for the image given by domain_x, domain_y.\n\n\n\n\n\n","category":"method"},{"location":"#VIDA.jl-1","page":"Home","title":"VIDA.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Variational image domain analysis for the EHT.  This package is for extracting features, such as ring from image reconstruction of EHT data. Currently these images must be in fits format although other types  my be included in the future.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"In order to extract features we use probability divergences to characterize differences between our image and some approximation. For the divergences implemented see the Getting Started page. The idea is then very  similar to variational inferences where we pick a parametric family of distributions which we call filters and then try to find the filter that minimizes the divergence. For the filters that are currently implemented  please see the page.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"See the for the complete list of documented functions and types.","category":"page"},{"location":"#Outline-1","page":"Home","title":"Outline","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Pages = [\n  \"index.md\",\n  \"getting_started.md\",\n  \"function_index.md\"\n]","category":"page"}]
}