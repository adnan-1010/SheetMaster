from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Spreadsheet
import json

@login_required
def dashboard(request):
    spreadsheets = Spreadsheet.objects.filter(user=request.user)
    return render(request, 'sheets/dashboard.html', {'spreadsheets': spreadsheets})

@login_required
def create_spreadsheet(request):
    spreadsheet = Spreadsheet.objects.create(
        user=request.user,
        title='Untitled Sheet',
        data={}
    )
    return redirect('sheets:spreadsheet', pk=spreadsheet.id)

@login_required
def spreadsheet_view(request, pk):
    spreadsheet = get_object_or_404(Spreadsheet, pk=pk, user=request.user)
    context = {
        'spreadsheet': spreadsheet,
        'saved_cells': json.dumps(spreadsheet.data),
        'col_labels': [chr(65 + i) for i in range(26)],  # A to Z
        'rows': range(1, 51),  # 50 rows
        'cols': range(26),  # 26 columns
    }
    return render(request, 'sheets/spreadsheet.html', context)

@login_required
def save_spreadsheet(request, pk):
    if request.method == 'POST':
        spreadsheet = get_object_or_404(Spreadsheet, pk=pk, user=request.user)
        data = json.loads(request.body)
        spreadsheet.data = data
        spreadsheet.save()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)

@login_required
def load_spreadsheet(request, pk):
    spreadsheet = get_object_or_404(Spreadsheet, pk=pk, user=request.user)
    return JsonResponse({'cells': spreadsheet.data})
