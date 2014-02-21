import random as r;
teachers = ['Mueller', 'Stephens']
classes = ['Advanced', 'AP', 'Programming', 'WebApps', 'Digital']
with open('names.txt', 'w') as f:
  for x in range(10):
    x = str(x);
    f.write('Clayton' + x + ' Petty' + x + ' ' + str(r.randrange(9, 13)) + ' ' + teachers[r.randrange(0,2)] + ' ' + classes[r.randrange(0,5)] + ' ' + str(r.randrange(1,9)) + '\n')
