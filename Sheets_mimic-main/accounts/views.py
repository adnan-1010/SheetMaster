from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib import messages

def signup_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Log the user in automatically
            login(request, user)
            messages.success(request, 'Account created successfully! Welcome to SheetMaster.')
            return redirect('/sheets/')
        else:
            # Add form errors to messages
            for field in form:
                for error in field.errors:
                    messages.error(request, f"{field.label}: {error}")
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})
