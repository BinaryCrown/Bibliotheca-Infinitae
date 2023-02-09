def BMStoVZ(matrix):
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == 0:
                matrix[i].pop()
            else:
                break
        matrix[i][0] += 1
        for j in range(1,len(matrix[i])):
            matrix[i][j] += matrix[i][0] + 1
    rv = []
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            rv.append(matrix[i][j])
    return rv