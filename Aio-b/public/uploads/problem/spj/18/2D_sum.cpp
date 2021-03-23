#include<bits/stdc++.h>

using namespace std;

typedef long long ll;

const int N(1e3 + 9);
const int inf(1e9);

int T, n, m, ans;
int a[N][N];
int tree[N << 2][N << 2];

void Build_y(int px, int lx, int rx, int py, int ly, int ry)
{
    if (ly == ry)
    {
        if (lx == rx)
        {
            tree[px][py] = a[lx][ly];
        }
        else
        {
            tree[px][py] = tree[px << 1][py] + tree[px << 1 | 1][py];
        }
//  return;
    }
    else
    {
        int mid = (ly + ry) >> 1;
        Build_y(px, lx, rx, py << 1, ly, mid);
        Build_y(px, lx, rx, py << 1 | 1, mid + 1, ry);
        tree[px][py] = tree[px][py << 1] + tree[px][py << 1 | 1];
    }
}

void Build_x(int px, int lx, int rx)
{
    if (lx != rx)
    {
        int mid = (lx + rx) >> 1;
        Build_x(px << 1, lx, mid);
        Build_x(px << 1 | 1, mid + 1, rx);
    }
    Build_y(px, lx, rx, 1, 1, m);
}

void Update_y(int px, int lx, int rx, int py, int ly, int ry, int x, int y, int val)
{
    if (ly == ry)
    {
        if (lx == rx)
        {
            tree[px][py] = val;
        }
        else
        {
            tree[px][py] = tree[px << 1][py] + tree[px << 1 | 1][py];
        }
        return;
    }
    else
    {
        int mid = (ly + ry) >> 1;
        if (y <= mid) Update_y(px, lx, rx, py << 1, ly, mid, x, y, val);
        else Update_y(px, lx, rx, py << 1 | 1, mid + 1, ry, x, y, val);
        tree[px][py] = tree[px][py << 1] + tree[px][py << 1 | 1];
    }
}

void Update_x(int px, int lx, int rx, int x, int y, int val)
{
    if (lx != rx)
    {
        int mid = (lx + rx) >> 1;
        if (x <= mid) Update_x(px << 1, lx, mid, x, y, val);
        else Update_x(px << 1 | 1, mid + 1, rx, x, y, val);
    }
    Update_y(px, lx, rx, 1, 1, m, x, y, val);
}

int Sum_y(int px, int py, int ly, int ry, int qly, int qry)
{
    if (ly >= qly && ry <= qry)
    {
        return tree[px][py];
    }
    int mid = (ly + ry) >> 1;
    int ans = 0;
    if (qly <= mid) ans += Sum_y(px, py << 1, ly, mid, qly, qry);
    if (qry > mid) ans += Sum_y(px, py << 1 | 1, mid + 1, ry, qly, qry);
    return ans;
}

int Sum_x(int px, int lx, int rx, int qlx, int qrx, int qly, int qry)
{
    if (lx >= qlx && rx <= qrx)
    {
        return Sum_y(px, 1, 1, m, qly, qry);
    }
    int mid = (lx + rx) >> 1;
    int ans = 0;
    if (qlx <= mid) ans += Sum_x(px << 1, lx, mid, qlx, qrx, qly, qry); 
    if (qrx > mid) ans += Sum_x(px << 1 | 1, mid + 1, rx, qlx, qrx, qly, qry);
    return ans;
}

int main()
{
    cin>>n>>m>>T;
    for (int i = 1; i <= n; i++)
    {
        for (int j = 1; j <= m; j++)
        {
            cin>>a[i][j];    
        }
    }
    Build_x(1, 1, n);
    for (int i = 1; i <= T; i++)
    {
        int kd;
        cin>>kd;
        if (kd == 1)
        {
            int x, y, val;
            cin>>x>>y>>val;
            Update_x(1, 1, n, x, y, val);
        }
        else 
        {
            int lx, rx, ly, ry;
            cin>>lx>>ly>>rx>>ry;
            cout<<Sum_x(1, 1, n, lx, rx, ly, ry)<<endl;
        }
    }
    for (int i = 1; i <= 10; i++)
    {
        for (int j = 1; j <= 10; j++)
        {
            cout<<tree[i][j]<<' ';
        }
        cout<<endl;
    }
    return 0;
}
