<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Laravel</title>
    
    @vite(['resources/css/app.css','resources/js/app.js'])
</head>

<body class="antialiased">
    
    <a href="{{route('login')}}">Login</a>
    <a href="{{route('register')}}">Register</a>
    <a href="{{route('d2d3')}}">d2d3 Design Editor</a>

    <h1></h1>
</body>
</html>
