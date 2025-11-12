"use client";

import { Card, Flex, Box, Text } from "@radix-ui/themes";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export function LeaderboardTable() {
  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "#",
        width: 80,
        sortable: false,
      },
      {
        field: "username",
        headerName: "Player",
        flex: 1,
        sortable: true,
      },
      {
        field: "current_wpm",
        headerName: "WPM",
        width: 120,
        sortable: true,
      },
      {
        field: "current_accuracy",
        headerName: "Accuracy",
        width: 120,
        sortable: true,
      },
    ],
    []
  );

  const rowData = [
    { username: "Player1", current_wpm: 100, current_accuracy: 95 },
  ];

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Flex align="center" gap="2">
          <Text size="6">🎮</Text>
          <Text size="4" weight="bold" className="text-gray-900">
            Leaderboard
          </Text>
        </Flex>
        <Box style={{ height: 400 }}>
          <div
            className="ag-theme-quartz"
            style={{ height: "100%", width: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{
                sortable: true,
                resizable: false,
              }}
              domLayout="normal"
              rowHeight={60}
              headerHeight={44}
              getRowStyle={(params) => {
                const rowIndex = params.node.rowIndex ?? -1;
                if (rowIndex === 0) {
                  return { background: "#fef3c7" };
                }
                if (rowIndex === 1) {
                  return { background: "#f9fafb" };
                }
                if (rowIndex === 2) {
                  return { background: "#fed7aa" };
                }
                return undefined;
              }}
            />
          </div>
        </Box>
      </Flex>
    </Card>
  );
}
